using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class FoodOrderDetail
{
    public int BookingId { get; set; }

    public int FoodId { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; }

    public virtual Booking Booking { get; set; } = null!;

    public virtual FoodItem Food { get; set; } = null!;
}
