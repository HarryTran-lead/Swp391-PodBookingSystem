namespace PodBooking.DTO
{
    public class Error
    {
        private int _errorCode;
        private string _message;

        public int errorCode
        {
            get { return _errorCode; }
            set { _errorCode = value; }
        }

        public string message
        {
            get { return _message; }
            set { _message = value; }
        }
    }
}
