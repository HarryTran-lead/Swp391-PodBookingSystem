namespace PodBooking.DTOs
{
    public class FoodItemDTO
    {
        public int FoodId { get; set; }
        public string FoodName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } // URL for accessing the image
        public bool IsAvailable { get; set; }
    }
}
