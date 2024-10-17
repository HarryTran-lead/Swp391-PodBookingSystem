using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Data.SqlClient;
namespace PodBooking.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServicePackageVNPayController : ControllerBase
    {
        [HttpPost]
        [Route("api/payment/servicepackage")]
        public IActionResult CreatePayment([FromBody] ServicePackagePaymentRequest paymentRequest)
        {
            // Your VNPay merchant info
            var merchantCode = "E8MKHDAW"; // Use the same merchant code or a different one if needed
            var secureKey = "ORZJJLH7V1FV19YRY4DCHXZIFOXOSHAC"; // Use the same secure key or a different one if needed
            var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

            // Build the payment request parameters
            var vnpayParameters = new SortedDictionary<string, string>
            {
                { "vnp_Version", "2.0.0" },
                { "vnp_Command", "pay" },
                { "vnp_TmnCode", merchantCode },
                { "vnp_Amount", (paymentRequest.Total * 100).ToString() }, // Total amount in dong
                { "vnp_CurrCode", "VND" },
                { "vnp_TxnRef", paymentRequest.PackageID.ToString() }, // Package ID as transaction reference
                { "vnp_OrderInfo", "Service Package ID: " + paymentRequest.PackageID },
                { "vnp_Locale", "vn" },
                { "vnp_ReturnUrl", paymentRequest.vnp_ReturnUrl },
                { "vnp_IpAddr", HttpContext.Connection.RemoteIpAddress.ToString() },
                { "vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss") },
            };

            // Generate the secure hash
            var queryString = string.Join("&", vnpayParameters.Select(p => $"{p.Key}={p.Value}"));
            var hashData = queryString + "&vnp_SecureHash=" + GenerateSecureHash(queryString, secureKey);

            var paymentUrl = vnpUrl + "?" + hashData;

            return Ok(new { paymentUrl });
        }

        private string GenerateSecureHash(string data, string secureKey)
        {
            // Implement hash generation using HMAC
            using (var hmac = new HMACSHA512(Encoding.ASCII.GetBytes(secureKey)))
            {
                var hash = hmac.ComputeHash(Encoding.ASCII.GetBytes(data));
                return BitConverter.ToString(hash).Replace("-", "").ToLower();
            }
        }
    }

    public class ServicePackagePaymentRequest
    {
        public int PackageID { get; set; } // Use PackageID instead of BookingID for service packages
        public decimal Total { get; set; }
        public string vnp_ReturnUrl { get; set; }
    }

    public class ServicePackagePaymentResponse
    {
        public string TxnRef { get; set; }
        public string Amount { get; set; }
        public string ResponseCode { get; set; }
        // Add other necessary properties based on VNPay response
    }
}
