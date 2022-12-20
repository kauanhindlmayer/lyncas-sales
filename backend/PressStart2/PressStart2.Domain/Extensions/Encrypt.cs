using System.Security.Cryptography;
using System.Text;

namespace PressStart2.Domain.Extensions
{
    public static class Encrypt
    {
        public static string EncryptPassword(this string password)
        {
            if (string.IsNullOrEmpty(password))
                return null;

            password += "@d4d26662-10c7-4ae7-931b-813888455996*$%#";
            var tempPassword = password;
            var md5 = MD5.Create();
            var data = md5.ComputeHash(Encoding.Default.GetBytes(tempPassword));
            var sbString = new StringBuilder();
            foreach (var d in data)
                sbString.Append(d.ToString("x2"));

            return sbString.ToString(); 
        }
    }
}
