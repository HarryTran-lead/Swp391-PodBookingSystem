using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class Account
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Username { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public string? Phone { get; set; }

    public int? LoyaltyPoints { get; set; }

    public string? Status { get; set; }

    public int? LocationId { get; set; }

    public string? Role { get; set; }

    public byte? Confirm { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual ICollection<FoodOrder> FoodOrders { get; set; } = new List<FoodOrder>();

    public virtual Location? Location { get; set; }

    public virtual ICollection<NotificationType> NotificationTypes { get; set; } = new List<NotificationType>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}