namespace PressStart2.Infra.CrossCutting.Constants
{
    public struct NotificationsConstants
    {
        public const string CUSTOMER_MODULE = "Cliente";
        public const string SALE_MODULE = "Venda";
        public const string USER_MODULE = "Usuário";

        public const string INVALID_REQUEST = "Request Inválido.";

        public const string CUSTOMER_NOT_FOUND = "Cliente não Localizado.";
        public const string CUSTOMER_REGISTERED = "Cliente Registrado com Sucesso.";
        public const string CUSTOMER_UPDATED = "Cliente Atualizado com Sucesso.";
        public const string CUSTOMER_DELETED = "Cliente Removido com Sucesso.";
        public const string CUSTOMER_CPF_DUPLICATE = "Já existe uma cliente com esse CPF.";

        public const string SALE_NOT_FOUND = "Venda não Localizada.";
        public const string SALE_REGISTERED = "Venda Registrada Com Sucesso.";
        public const string SALE_UPDATED = "Venda Atualizada com Sucesso.";
        public const string SALE_DELETED = "Venda Removida com Sucesso.";

        public const string USER_REGISTERED = "Usuário Registrado com Sucesso.";
        public const string USER_PASSWORD_NOT_MATCH = "Senhas não conferem.";
        public const string USER_LOGIN_DATA_INCORRECT = "Dados de Login Incorreto";
    }
}
