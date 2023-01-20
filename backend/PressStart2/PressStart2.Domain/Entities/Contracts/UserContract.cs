using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Entities.Contracts
{
    public static class UserContract
    {
        public static void AddUserContract(this User user)
        {
            new AddNotifications<User>(user)
                .IfNullOrInvalidLength(p => p.Login, 1, 200, "O E-mail precisa ser preenchido.")
                .IfNullOrInvalidLength(p => p.Name, 1, 200, "O Nome precisa ser preenchido.")
                .IfNullOrInvalidLength(p => p.Password, 1, 100, "A Senha precisa ser preenchida.")
                .IfNotEmail(p => p.Login, "O E-mail precisa ser válido.");
        }
    }
}
