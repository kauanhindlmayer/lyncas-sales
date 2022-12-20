using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Entities.Contracts
{
    public static class UserContract
    {
        public static void AddUserContract(this User user)
        {
            new AddNotifications<User>(user)
                .IfNullOrInvalidLength(p => p.Login, 1, 200)
                .IfNullOrInvalidLength(p => p.Name, 1, 200)
                .IfNullOrInvalidLength(p => p.Password, 1, 100)
                .IfNotEmail(p => p.Login);
        }
    }
}
