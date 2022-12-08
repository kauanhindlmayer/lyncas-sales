namespace PressStart2.Domain.Commands.UpdateSale
{
    public class UpdateSaleResponse
    {
        public UpdateSaleResponse(string message)
        {
            Message = message;
        }

        public string Message { get; set; }
    }
}
