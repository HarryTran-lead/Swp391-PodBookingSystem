namespace PodBooking.DTOs
{
    public class BlogDTO
    {
        public int Id { get; set; }
        public int? AdminId { get; set; }
        public string? ShortDes { get; set; }
        public string? MainDes { get; set; }
        public string? Title { get; set; }
        public string? Img { get; set; } // Image URL as a string
    }
}
