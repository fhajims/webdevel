# Running WASM Demos 

e.g. on Open Stack

## Step by step -- Prepare your system with emscripten

Try it out online <https://wasdk.github.io/WasmFiddle/>, <http://mbebenita.github.io/WasmExplorer/> or install it.


<https://emscripten.org/docs/getting_started/downloads.html#sdk-download-and-install>


update remote access on your local machine:

```
vi ~/.ssh/config
```

```
Host secweb
    Hostname x.x.x.x
    IdentityFile ~/.ssh/id_openstack
    User debian 
    # for mac / textmate users:
    RemoteForward 52698 localhost:52698
```

access the remote machine via ssh

```
# on local machine
ssh secweb
```

* Optional, for Mac / [Textmate](https://macromates.com) users: try ```rmate``` script to save files over ssh (<https://github.com/textmate/rmate/>) .

	```
	# on remote host
	sudo apt-get update
	sudo apt-get install ruby
	sudo apt-get install curl
	sudo curl -Lo /bin/rmate https://raw.githubusercontent.com/textmate/rmate/master/bin/rmate 
	sudo chmod a+x /bin/rmate 
	```

	```
	# on local machine 
	# using configuration from ~/.ssh/config
	ssh secweb
	# or use explicit port forwarding
	# ssh -R 52698:localhost:52698 secweb
	```

	```
	# on remote machine open files 
	# using the 'rmate' command (instead of command 'vi')   
	rmate whateverfile.txt
	```

* Optional, for remote development with Visual Studio IDE you might install and use the [remote development](https://code.visualstudio.com/docs/remote/ssh) and the ```remote-ssh``` plugins. Use remote-ssh to connect to hosts specifing ```ssh secweb8``` and click *Open folder*

* Optionally, you might copy forth and back files with ```scp```:

	```
	# get you remote ip address of the open stack instance
	# e.g.: 10.77.23.190 
	ip addr | grep "inet 10." 
	```

	```
	scp -r /tmp/local-demo secweb:/tmp
	# which means, for example (compare settings in file ~/.ssh/config):
	# scp -r  -i ~/.ssh/id_openstack /tmp/local-demo debian@10.77.23.190:/tmp
	``` 


### (2) Prepare your system with emcc compiler (emsdk)


```
# sudo apt update
# sudo apt upgrade
sudo apt-get update
sudo apt install git
sudo apt-get install cmake
sudo apt-get install xz-utils
alias ll="ls -al" # better add to ~/.profile
```

Install and activate the **emcc** compiler

```
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
# make permanent:
echo "source /home/debina/emsdk/emsdk_env.sh" >> ~/.profile
# check installed compiler
emcc --version
```

### Try compiling asm.js (Optimised by JS-Engines in Firefox and Chrome)

See: <https://caniuse.com/#feat=asmjs>

Provide C file ```vi hello_world.c```

```
#include <stdio.h>

int main() {
  printf("hello, world!\n");
  return 0;
}
```

Compile (takes some time...)

```
emcc hello_world.c 
```

Run

```
time node a.out.js
```


### Provide a html wrapper for wasm

Use emscripten to generate html wrapper for you:

```
emcc hello_world.c -o hello.html 
```


Optionally, startup a server (serving static pages from local dir):
See [Big list of http sttic server one-liners](https://gist.github.com/willurd/5720255)

```
ruby -run -ehttpd . -p8000
# or
emrun --no_browser --port 8000 .
# or
# ....
```

Open in Browser <http://x.x.x.x:8000/hello.html>: 

```
open http://10.77.23.94:8000/hello.html
```