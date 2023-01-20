using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Entities.Contracts
{
    public static class CustomerContract
    {
        public static void AddCustomerContract(this Customer customer)
        {
            new AddNotifications<Customer>(customer)
                .IfNullOrInvalidLength(p => p.Name, 1, 200, "O Nome precisa ser preenchido.")
                .IfNullOrInvalidLength(p => p.Email, 1, 300, "O E-mail precisa ser preenchido.")
                .IfNotEmail(p => p.Email, "O E-mail precisa ser válido.")
                .IfNullOrInvalidLength(p => p.Phone, 1, 20, "O Telefone precisa ser preenchido.")
                .IfNullOrInvalidLength(p => p.Cpf, 1, 14, "O CPF precisa ser preenchido.")
                .IfNotCpf(p => p.Cpf, "O CPF precisa ser válido.");
        }

        public static void UpdateCustomerContract(this Customer customer)
        {
            new AddNotifications<Customer>(customer)
                .IfNullOrInvalidLength(p => p.Name, 1, 200, "O Nome precisa ser preenchido.")
                .IfNullOrInvalidLength(p => p.Email, 1, 300, "O E-mail precisa ser preenchido.")
                .IfNotEmail(p => p.Email, "O E-mail precisa ser válido.")
                .IfNullOrInvalidLength(p => p.Phone, 1, 20, "O Telefone precisa ser preenchido.")
                .IfNullOrInvalidLength(p => p.Cpf, 1, 14, "O CPF precisa ser preenchido.")
                .IfNotCpf(p => p.Cpf, "O CPF precisa ser válido.");
        }
    }
}
