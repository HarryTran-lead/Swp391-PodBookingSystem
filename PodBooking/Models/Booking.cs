using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class Booking
{
    public int BookingId { get; set; }

    public int? AccountId { get; set; }

    public int? PodId { get; set; }

    public int? PackageId { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public bool? Status { get; set; }

    public decimal? Total { get; set; }

    public int? PaymentId { get; set; }

    public int? NotificationId { get; set; }

    public virtual Account? Account { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual ICollection<FoodOrder> FoodOrders { get; set; } = new List<FoodOrder>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ServicePackage? Package { get; set; }
}
