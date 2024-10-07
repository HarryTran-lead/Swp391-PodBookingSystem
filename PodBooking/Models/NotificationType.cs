using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class NotificationType
{
    public int Id { get; set; }

    public int? AccountId { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}
