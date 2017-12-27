(function () {
 angular
 .module('BaitsaagchApp')
 .controller('helpCtrl', helpCtrl);
 function helpCtrl() {
	 var vm = this;
	 vm.main = {
	 	content: 'Нүүр хуудсанд ирж бүртгүүлэх ёстой автобуснуудын жагсаалт байгаа\nменюнд байрлах байршлуудаас өөрийн байршлийг сонгон харах боломжтой\n'
	 };
 }
})();