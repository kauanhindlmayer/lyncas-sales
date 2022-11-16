using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.DTOs
{
    public class CommandResponse
    {
        public bool Success { get; set; }
        public object Data { get; set; }
        public IEnumerable<Notification> Notifications { get; set; }

        public CommandResponse(object data, INotifiable notifications)
        {
            Success = notifications.IsValid();
            Data = notifications.IsValid() ? data : null;
        }

        public CommandResponse(INotifiable notifications)
        {
            Success = false;
            Data = null;
            Notifications = notifications.Notifications;
        }
    }
}
