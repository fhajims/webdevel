import http from 'http'


/* 
    We need to know the type of any file we serve.
    For a browser only the content type is relevant.
*/ 
export function serveStatic(url: string, res: http.ServerResponse){
    // static files can be found in subdir 'public'
    var filename = `public${url}`; // TODO: put hard coded string to config
  
    // strip "rest" from url. E.g.: ?k=v&k2=v2#about
    filename = filename.split("?").shift() || 'error.txt' // error if no filenam
  
    var suffix = filename.split(".").pop() || "txt";
    var contenttype = "text/plain";
    console.log(`For suffix '${suffix}' we set content-typte to '${contenttype}'.`)
    switch (suffix) {
      case "html":
        contenttype = "text/html"
        break
      case "js":
        contenttype = "application/javascript"
        break
      case "png":
        contenttype = "image/png"
        break
      // TODO add for images and css and ... 
      default:
        contenttype = "text/plain";
        break;
    }
    res.writeHead(200, { 'Content-Type': contenttype })
    
    
    console.log(`Serving ${filename} (of type ${contenttype}'...`)
    readAndWriteFile(res,contenttype,filename)
  }
  

  /*
    Get file from the file system and send (binary) data back to the client.
  */
  import fs from 'fs'
  function readAndWriteFile(res: http.ServerResponse, contenttype:string, filepath:string){
    fs.readFile(filepath, (err, data) => {
      if (err) {
        res.writeHead(404, "File Not found", { "content-type": "text/plain; charset=utf-8" });
        res.end("We could not find file " + filepath);
        console.log("ERROR reading file '" + filepath + "': " + err);
        return
      }
  
      res.writeHead(200, "OK Node", { "content-type": contenttype + "; charset=utf-8" });
      res.end(data)
      //console.log(data);
    });
  

  }
