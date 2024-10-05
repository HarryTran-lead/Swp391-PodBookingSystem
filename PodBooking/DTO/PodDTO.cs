namespace PodBooking.DTOs
{
    public class PodDTO
    {
        public int PodId { get; set; }
        public string? Name { get; set; }
        public int? LocationId { get; set; }
        public int? PodModelId { get; set; }
        public string? ImgPod { get; set; } // Image URL as a string
        public decimal? PricePerHour { get; set; }
        public string? Description { get; set; }
    }
}
