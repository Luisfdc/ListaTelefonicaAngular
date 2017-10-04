angular.module("ListaTelefonica").controller("ListaTelefonicaCtrl", function($scope, $filter, $http, contatoApi, operadoraApi) {
    $scope.app = "Lista Telefonica";
    $scope.contatos = [];
    $scope.operadoras = []

    var carregarContatos = function() {
        contatoApi.getContatos().then(function(dados) {
            $scope.contatos = dados.data;
        });
    }
    var carregarOperadoras = function() {
        operadoraApi.getOperadoras().then(function(dados) {
            $scope.operadoras = dados.data;
        });
    }

    $scope.AdicuionarContatos = function(contato) {
        contatoApi.saveContatos(contato).then(function(dados) {
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