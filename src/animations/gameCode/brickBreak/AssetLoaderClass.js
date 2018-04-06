/**
 * Created by edwardwalther on 8/20/14.
 */



function AssetLoaderClass(){

    //load graphic assets and show loading text

    var loaderProgressText = new createjs.Text(0+" %" ,"bold 50px Arial", "#FFFF00");
    this.bounds = loaderProgressText.getBounds();
    loaderProgressText.x = halfWidth - (this.bounds.width/2);
    loaderProgressText.y = halfHeight - (this.bounds.height/2);

    this.loaderProgressText = loaderProgressText;


    var loader = new createjs.LoadQueue(false);
    this.loader = loader;

};


AssetLoaderClass.prototype.loadItems = function(arr, resultFunctionParam, fileLoad){

    //arr is an array of objects with id: and src:
    stage.addChild(this.loaderProgressText);

    this.loader.loadManifest(arr);

    this.resultFunction = resultFunctionParam;
    this.loader.removeAllEventListeners();
    this.loader.addEventListener("complete", proxy(this.handleComplete, this));
    this.loader.addEventListener("progress", proxy(this.loaderProgress, this));
    if(fileLoad)this.loader.addEventListener("fileload", proxy(this.handleFileLoad, this));

}



AssetLoaderClass.prototype.handleComplete = function(e) {



    this.resultFunction();
    //stage.setChildIndex(this.loaderProgressText, stage.children.length-1);//testing
    stage.removeChild(this.loaderProgressText);



}

AssetLoaderClass.prototype.loaderProgress = function(e) {
    var perc = Math.round(e.progress*100);

    this.loaderProgressText.text =  perc+"%";
    this.bounds = this.loaderProgressText.getBounds();
    this.loaderProgressText.x = (canvasWidth - this.bounds.width)/2;
}



AssetLoaderClass.prototype.handleFileLoad = function(b){




    if(b.item.type == createjs.LoadQueue.XML){
        bitmapFont.xml = this.loader.getResult("xml");
    }
    else if(b.item.type == createjs.LoadQueue.IMAGE){
        bitmapFont.bitmap = this.loader.getResult("image");
    }



}

