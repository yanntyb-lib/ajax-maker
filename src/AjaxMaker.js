export default class AjaxMaker{
    constructor(url, methode, callback = null, data = null){
        this.url = url;
        this.methode = methode;
        this.callback = callback;
        this.data = data;
        this.req = new XMLHttpRequest();
    }

    send(data = null){
        if(["POST","GET"].includes(this.methode.toUpperCase())){
            this.req.open(this.methode, this.url);
            this.req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        switch (this.methode.toUpperCase()){
            case "POST":
                if(data){
                    this.req.send(JSON.stringify(data));
                }
                else if(this.data){
                    this.req.send(JSON.stringify(this.data))
                }
                else{
                    console.log("AjaxMaker provided with " + this.url + " url in POST doesnt have data to send");
                }
                break;
            case "GET":
                this.req.send();
                break;
        }

        if(this.callback !== null){
            this.req.onload = () => {
                this.callback(JSON.parse(this.req.responseText))
            }
        }
    }


}