using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class Location
{
    public int LocationId { get; set; }

    public string? Name { get; set; }

    public string? Village { get; set; }

    public string? District { get; set; }

    public string? Province { get; set; }

    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();

    public virtual ICollection<Pod> Pods { get; set; } = new List<Pod>();
}
