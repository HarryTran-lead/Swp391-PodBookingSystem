using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class CartItem
{
    public int BookingId { get; set; }

    public int FoodId { get; set; }

    public int? Quantity { get; set; }

    public virtual Booking Booking { get; set; } = null!;

    public virtual FoodMenu Food { get; set; } = null!;
}
