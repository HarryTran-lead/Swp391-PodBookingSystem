public class FoodOrderDetailDTO
{
    public int BookingId { get; set; }

    public List<int> FoodIds { get; set; } // List of Food IDs

    public int Quantity { get; set; }

    public decimal Price { get; set; }
}
