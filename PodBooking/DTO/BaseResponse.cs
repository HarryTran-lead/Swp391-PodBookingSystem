namespace PodBooking.DTO
{
    public class BaseResponse<T>
    {
        private Error? _error;
        private List<T>? _items;
        private T? _item;
        private Pagination? _pagination;
        private string? _message;
        private string? _accessToken;

        public Error? Error { get => _error; set => _error = value; }
        public List<T>? Items { get => _items; set => _items = value; }
        public T? Item { get => _item; set => _item = value; }
        public Pagination? Pagination { get => _pagination; set => _pagination = value; }
        public string? Message { get => _message; set => _message = value; }
        public string? AccessToken { get => _accessToken; set => _accessToken = value; }
    }
}
