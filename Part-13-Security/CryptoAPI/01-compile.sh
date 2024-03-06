#!/bin/bash
echo "We create the app structure and a first file"
webappdir="01-crypto-api-random"
mkdir -p "${webappdir}"

jsfilename="random"
filepath="${webappdir}/${jsfilename}.ts"
if [ -f "${filepath}" ];then
  echo "File ${filepath} already exists."
else
    cat <<-EOF >"${filepath}"
		const twentyBytes = crypto.getRandomValues(new Uint8Array(20));
		console.log(twentyBytes)

		console.log( "The WebCrypto API produced 20 numbers with the PRNG (pseudo-random-number-generator): '" +  twentyBytes + '"' )

		document
		    .getElementById('out')
		    .innerText = "The WebCrypto API produced twenty secure pseudo random numbers for you: '" + twentyBytes+"'."
		EOF
fi

htmlfilename=index
htmlfilepath="${webappdir}/${htmlfilename}.html"
if [ -f "${htmlfilepath}" ];then
  echo "File htmlfilepath already exists."
else
    cat <<-EOF >>"${htmlfilepath}"
		<!DOCTYPE html>
		<html lang="en">
		     <head>
		      <script src="${jsfilename}.js" defer></script>
		      <title>Using WebCrypto API</title>
		     </head>
		     <body>
		        <div id="out">This template text should be replaced by a secure random number produced by the WebCrypto API</div>
		     </body>
		</html>
		EOF
fi

echo "The HTML-file '{$htmlfilepath}' was created."

echo "Serve the created html with static server"
echo "  We start up in the background (stop with 'killall Python')"
echo "  'python3 -m http.server 8000 --directory ${webappdir}'"
python3 -m http.server 8000 --directory "${webappdir}" & 


echo "Access the static html at:"
echo "  'http://localhost:8000/' "
# open in the background
( sleep 2 && open http://localhost/8000/ ) & 

echo "We watch the file and compile TS to JS"
echo " (Requires: sudo npm install -g nodemon)" 
nodemon -e ts --exec tsc "${filepath}"
