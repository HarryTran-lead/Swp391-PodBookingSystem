using PodBooking.Config;

namespace PodBooking.DTO
{
    public class Pagination
    {
        private int _currentPage;
        private int _totalPage;
        private int _pageSize;

        public int currentPage
        {
            get { return _currentPage; }
            set { _currentPage = value; }
        }

        public int totalPage
        {
            get { return _totalPage; }
            set { _totalPage = value; }
        }

        public int pageSize
        {
            get { return _pageSize; }
            set { _pageSize = value; }
        }

        public Pagination() {
            _currentPage = 0;
            _totalPage = 1;
            _pageSize = Enums.Pagination.pageSizeDefault;

        }
    }
}
