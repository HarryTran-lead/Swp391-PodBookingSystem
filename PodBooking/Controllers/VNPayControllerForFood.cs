using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace PodBooking.Controllers
{
    [ApiController]
    [Route("api/payment")]
    public class VNPayControllerForFood : ControllerBase
    {
        private const string MerchantCode = "E8MKHDAW";
        private const string SecureKey = "ORZJJLH7V1FV19YRY4DCHXZIFOXOSHAC";
        private const string VNPayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

        // Gi? s? b?n có ph??ng th?c ?? ki?m tra t?ng ti?n ?ã thanh toán cho m?t booking
        private bool IsFullPaymentCompleted(int bookingId, decimal totalAmountRequired)
        {
            // L?y t?ng s? ti?n ?ã thanh toán cho bookingId này t? c? s? d? li?u
            //var totalPaid = dbContext.Transactions
            //                         .Where(t => t.BookingId == bookingId && t.Status == "Completed")
            //                         .Sum(t => t.AmountPaid);

            return true;
        }

        [HttpPost("foodorder")]
        public IActionResult CreatePaymentForFoodOrder([FromBody] FoodOrderPaymentRequest paymentRequest)
        {
            // Ki?m tra n?u t?ng s? ti?n ?ã ???c thanh toán
            decimal totalAmountRequired = 100000; // S? ti?n yêu c?u (ví d?)

            if (IsFullPaymentCompleted(paymentRequest.BookingId, totalAmountRequired))
            {
                return BadRequest("Full payment has already been completed for this Booking ID.");
            }

            // T?o mã giao d?ch duy nh?t (TxnRef)
            var txnRef = GenerateTxnRef(paymentRequest.BookingId);

            var vnpayParams = new SortedDictionary<string, string>
            {
                { "vnp_Version", "2.0.0" },
                { "vnp_Command", "pay" },
                { "vnp_TmnCode", MerchantCode },
                { "vnp_Amount", (paymentRequest.Total * 100).ToString() },
                { "vnp_CurrCode", "VND" },
                { "vnp_TxnRef", txnRef },
                { "vnp_OrderInfo", "Booking ID: " + paymentRequest.BookingId },
                { "vnp_Locale", "vn" },
                { "vnp_ReturnUrl", paymentRequest.vnp_ReturnUrl },
                { "vnp_IpAddr", HttpContext.Connection.RemoteIpAddress?.ToString() },
                { "vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss") }
            };

            var queryString = string.Join("&", vnpayParams.Select(p => $"{p.Key}={p.Value}"));
            var secureHash = GenerateSecureHash(queryString, SecureKey);

            var paymentUrl = $"{VNPayUrl}?{queryString}&vnp_SecureHash={secureHash}";

            return Ok(new { paymentUrl });
        }

        private static string GenerateTxnRef(int bookingId)
        {
            // T?o m?t TxnRef duy nh?t d?a trên BookingId và th?i gian hi?n t?i
            return $"{bookingId}-{DateTime.Now:yyyyMMddHHmmssfff}";
        }

        private static string GenerateSecureHash(string data, string secureKey)
        {
            using var hmac = new HMACSHA512(Encoding.ASCII.GetBytes(secureKey));
            var hash = hmac.ComputeHash(Encoding.ASCII.GetBytes(data));
            return BitConverter.ToString(hash).Replace("-", "").ToLower();
        }
    }

    public class FoodOrderPaymentRequest
    {
        public int BookingId { get; set; }
        public decimal Total { get; set; }
        public string vnp_ReturnUrl { get; set; }
    }

    public class FoodOrderPaymentResponse
    {
        public string TxnRef { get; set; }
        public string Amount { get; set; }
        public string ResponseCode { get; set; }
        // Additional fields as required cái này em định làm riêng cho thanh toán food, nhưng mà em sài chung thanh toán này lun
    }
}
