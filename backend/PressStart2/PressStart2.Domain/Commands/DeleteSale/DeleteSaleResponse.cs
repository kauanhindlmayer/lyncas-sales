namespace PressStart2.Domain.Commands.DeleteSale
{
    public class DeleteSaleResponse
    {
        public DeleteSaleResponse(string message)
        {
            Message = message;
        }

        public string Message { get; set; }
    }
}
