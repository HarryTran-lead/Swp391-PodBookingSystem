using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class FoodItem
{
    public int FoodId { get; set; }

    public string FoodName { get; set; } = null!;

    public byte[]? ImgPod { get; set; }

    public decimal Price { get; set; }

    public string? Description { get; set; }

    public bool? IsAvailable { get; set; }

    public virtual ICollection<FoodOrderDetail> FoodOrderDetails { get; set; } = new List<FoodOrderDetail>();
}
