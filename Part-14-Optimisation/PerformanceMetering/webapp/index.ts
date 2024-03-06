

function getMaxPrimeFactor (n:number):number {
  var i
  var max = -1;
   while(n % 2 == 0) {
      max = 2;
      n = n/2; //reduce n by dividing this by 2
   }
   for(i = 3; i <= Math.sqrt(n); i=i+2){ //i will increase by 2, to get only odd numbers
      while(n % i == 0) {
         max = i;
         n = n/i;
      }
   }
   if(n > 2) {
      max = n;
   }
   return max;
}


performance.mark('start');
for (var i=1; i<999 ; i++){
  const n = Math.floor(Math.random()*i*10**9)
  console.log('Max prime factor for '+n+' is ' + getMaxPrimeFactor(n))
}
performance.mark('stop');
const m = performance.measure("ManyTimesMaxPrimeFactor", 'start', 'stop');
const time_used = m.duration / 1000 // in secs
console.log('time used: '+ time_used+ 's')

const outPutElement = document.getElementById('out') as HTMLElement

outPutElement.innerText = "We measured the time to run function getMaxPrimeFactor 999 times.\n"+
                  "It took us '" + time_used+"' seconds.\n\n"+
                  "Open developer console\n"+
                  " to check the generated values in the log output.\n"+
                  " Check tab 'Timelines' for CPU usage also.\n\n Hit 'RELOAD' to run again."