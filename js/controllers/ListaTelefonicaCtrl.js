angular.module("ListaTelefonica").controller("ListaTelefonicaCtrl", function($scope, $filter, $http) {
    $scope.app = "Lista Telefonica";
    $scope.contatos = [];

    var carregarContatos = function() {
        $http.get("http://localhost:3000/contatos").then(function(dados) {
            $scope.contatos = dados.data;
        });
    }

    $scope.operadoras = []


    var carregarOperadoras = function() {
        $http.get("http://localhost:3000/operadoras").then(function(dados) {
            $scope.operadoras = dados.data;
        });
    }

    $scope.AdicuionarContatos = function(contato) {
        $http.post("http://localhost:3000/contatos", contato).then(function(dados) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
    }

    $scope.ApagarContatos = function(contatos) {
        $scope.contatos = contatos.filter(function(contato) {
            if (!contato.selecionado) return contato;
        });
    }
    $scope.isContatoSelecionado = function(contatos) {
        return contatos.some(function(contato) {
            if (contato.selecionado) return contato;
        });
    }
    $scope.ordenarPor = function(campo) {
        $scope.criterioDeOdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }
    carregarContatos();
    carregarOperadoras();
});