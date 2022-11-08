using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Entities.Contracts
{
    public static class ClienteContract
    {
        public static void AdicionarClienteContract(this Cliente cliente)
        {
            new AddNotifications<Cliente>(cliente)
                .IfNullOrInvalidLength(p => p.Nome, 1, 200, "O nome precisa ser preenchido com até 200 caracteres.")
                .IfNullOrInvalidLength(p => p.Email, 1, 300)
                .IfNotEmail(p => p.Email)
                .IfNullOrInvalidLength(p => p.Telefone, 1, 20)
                .IfNullOrInvalidLength(p => p.Cpf, 1, 14)
                .IfNotCpf(p => p.Cpf);
        }

        public static void AtualizarClienteContract(this Cliente cliente)
        {
            new AddNotifications<Cliente>(cliente)
                .IfNullOrInvalidLength(p => p.Nome, 1, 200)
                .IfNullOrInvalidLength(p => p.Email, 1, 300)
                .IfNotEmail(p => p.Email)
                .IfNullOrInvalidLength(p => p.Telefone, 1, 20)
                .IfNullOrInvalidLength(p => p.Cpf, 1, 14)
                .IfNotCpf(p => p.Cpf);
        }
    }
}
