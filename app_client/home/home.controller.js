(function () { 
  angular
   .module('BaitsaagchApp')
   .controller('homeCtrl', homeCtrl)
   .directive('pitchCanvas', function() {

    /*function link(scope, element, attrs) {
        console.log(element[0].height + ' : ' + element[0].width);
        var ctx = element[0].getContext('2d');
        //ctx.font = "100px Arial";
        //ctx.fillText("Hello World", 100, 150);

        var line = new Image();
        var bus = new Image();
        line.src = "http://www.libpng.org/pub/png/img_png/AlphaBall.png";
        bus.src = "http://www.howdesign.com/wp-content/uploads/UX-Design-.png";
        ctx.drawImage(line, 0, 0, 100, 100);   
        ctx.drawImage(bus, 100, 0, 1000, 1000);
    }*/
    function link(scope, element) {
            var canvas = element[0];
            var ctx = canvas.getContext('2d');

            console.log(scope.info);
            var notNull = 0;//heden gazar ochson gej sistemd orson bgaag toolno
            for (var i = 0; i < scope.info.length; i++) {
              if (scope.info[i].date != null)
                notNull++;
            }
            var busX = 0;
            var oneMom = canvas.width / (scope.info.length+2) * (notNull) + canvas.height/7/2;
            if (notNull != 0)
              busX = oneMom;

            loadBus("/images/bus.png", busX);


            function loadBus(source, x){
              var img = new Image();
              img.src = source;

              img.onload = function() {
                ctx.drawImage(img, x, 10, canvas.height/7, canvas.height/2);
                             //x, y, canvas.width, canvas.height);
              };  
            };
            loadLine();
            function loadLine(){
              var img = new Image();
              img.src = "/images/line2.png";

              img.onload = function() {
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(img, 5, 63, canvas.width - 10, 50);
                             //x, y, canvas.width, canvas.height);
              };  
            };
          }

  return {
    restrict: 'E',
    replace: true,
    scope: {
      info: '='
    },
    link: link,
    template: '<canvas id="myCanvas" style=" width: 100%; height: 50px;"></canvas>'
    };
});




  homeCtrl.$inject = ['myGlobalVars', 'baitsaagchData'];
  function homeCtrl (myGlobalVars, baitsaagchData) {//Ehleed root page ruu orohod ub geer unshij avchirdag heseg
    var vm = this;

    vm.sidebar = {
      hello: "Энэ өдрийн мэнд!",
      content: "Энэхүү апп нь авто тээврийн байцаагчийн ажлыг хөнгөвчилхөд зориулсан апп юм. Нэмэлт боломжуудыг оруулахыг хүсвэл BaitsaagchApp @yahoo.com хаягаар холбогдоно уу."
    };
    vm.message = "Checking transports information";
    
    baitsaagchData.getTransportsList(myGlobalVars.name)
    .then(function successCallback(response) {
      //console.log(response);
      vm.message = response.data.length > 0 ? "" : "Энэ байршилд ирэх автобус олдсонгүй";
      vm.transports = response.data ;
      //console.log(vm.transports[1]);
    },
    function errorCallback(response) {
      vm.message = "Sorry, something's gone wrong";
    });
  }
})();