using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Entities.Contracts
{
    public static class CustomerContract
    {
        public static void AddCustomerContract(this Customer customer)
        {
            new AddNotifications<Customer>(customer)
                .IfNullOrInvalidLength(p => p.Name, 1, 200, "O nome precisa ser preenchido com até 200 caracteres.")
                .IfNullOrInvalidLength(p => p.Email, 1, 300)
                .IfNotEmail(p => p.Email)
                .IfNullOrInvalidLength(p => p.Phone, 1, 20)
                .IfNullOrInvalidLength(p => p.Cpf, 1, 14)
                .IfNotCpf(p => p.Cpf);
        }

        public static void UpdateCustomerContract(this Customer customer)
        {
            new AddNotifications<Customer>(customer)
                .IfNullOrInvalidLength(p => p.Name, 1, 200)
                .IfNullOrInvalidLength(p => p.Email, 1, 300)
                .IfNotEmail(p => p.Email)
                .IfNullOrInvalidLength(p => p.Phone, 1, 20)
                .IfNullOrInvalidLength(p => p.Cpf, 1, 14)
                .IfNotCpf(p => p.Cpf);
        }
    }
}
