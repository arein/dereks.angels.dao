const { Template } = require("@walletpass/pass-js");

// Create a Template from local folder, see __test__/resources/passes for examples
// .load will load all fields from pass.json,
// as well as all images and com.example.passbook.pem file as key
// and localization string too

const passCert = `-----BEGIN CERTIFICATE-----
MIIGOjCCBSKgAwIBAgIIeAmJCu/s90wwDQYJKoZIhvcNAQELBQAwgZYxCzAJBgNV
BAYTAlVTMRMwEQYDVQQKDApBcHBsZSBJbmMuMSwwKgYDVQQLDCNBcHBsZSBXb3Js
ZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczFEMEIGA1UEAww7QXBwbGUgV29ybGR3
aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkw
HhcNMjExMDE3MjE0MDU0WhcNMjIxMTE2MjE0MDUzWjCBozErMCkGCgmSJomT8ixk
AQEMG3Bhc3MuY29tLmRlcmVrcy5hbmdlbHMuZ2F0ZTE7MDkGA1UEAwwyUGFzcyBU
eXBlIElEIHdpdGggTkZDOiBwYXNzLmNvbS5kZXJla3MuYW5nZWxzLmdhdGUxEzAR
BgNVBAsMClEzMzhVWUdGWjgxFTATBgNVBAoMDEZsb21pbywgSW5jLjELMAkGA1UE
BhMCVVMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1wCKa52cdWF+O
BvIi/WpoFETYC1fZdmk3pM80T1Wuh6xOn0i4PY15jsEleqKlfqDlWWk1vInLO/qr
GILBZhqK2gRFu8LxmWLGR+uEHkMgR0GnYMffhlIBPWRxdxaurWK0oP1EyC8Przd9
TAUOpzk2X/RWBfFxnhpTjSkyKKksuZ8Y783dU1lL1IyI6AlwWFd05fcHssirKtNr
3xkxgDCyMGFvutJiheqTmSGjW3R2di7UFUKlfk+qsL1KBWvKlQJIIOXm7JPFPqns
xzID3aUriBClzHuWDDv5WXwC2EOJVWwzePoT0YiteUtilcK5kkjImKK/+Vd/JTnz
GQH7jFdJAgMBAAGjggJ7MIICdzAJBgNVHRMEAjAAMB8GA1UdIwQYMBaAFIgnFwmp
thhgi+zruvZHWcVSVKO3MD8GCCsGAQUFBwEBBDMwMTAvBggrBgEFBQcwAYYjaHR0
cDovL29jc3AuYXBwbGUuY29tL29jc3AwMy13d2RyMDIwggEcBgNVHSAEggETMIIB
DzCCAQsGCSqGSIb3Y2QFATCB/TCBwwYIKwYBBQUHAgIwgbYMgbNSZWxpYW5jZSBv
biB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFu
Y2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29u
ZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNh
dGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjA1BggrBgEFBQcCARYpaHR0cDovL3d3
dy5hcHBsZS5jb20vY2VydGlmaWNhdGVhdXRob3JpdHkwHgYDVR0lBBcwFQYIKwYB
BQUHAwIGCSqGSIb3Y2QEDjAwBgNVHR8EKTAnMCWgI6Ahhh9odHRwOi8vY3JsLmFw
cGxlLmNvbS93d2RyY2EuY3JsMB0GA1UdDgQWBBQxUczu/YGMtcPy0ZmZ/oS/W8Dn
qDALBgNVHQ8EBAMCB4AwEAYKKoZIhvdjZAYDAgQCBQAwKwYKKoZIhvdjZAYBEAQd
DBtwYXNzLmNvbS5kZXJla3MuYW5nZWxzLmdhdGUwKwYKKoZIhvdjZAYBGgQdDBtw
YXNzLmNvbS5kZXJla3MuYW5nZWxzLmdhdGUwDQYJKoZIhvcNAQELBQADggEBAMJN
L9vfWw7iQULrn+e3U/p0L62R2NOq+26t8z7kJe2YCVq6U6gQWLptnTfLehrd9bZu
ZwZQbOMQ2ilETjdOMySrfXduu7Cgjbn0kojnmm1sUojlFHW8BYbmKyq8a3hlY1rw
LTxPDrM0h7bGAyCJFADEsnGozOQlqbNR29UrcKNcgFkOSBD9HeFc0w+iX5ad67NY
w/uSpsVkAMfu7H6GmcN7WVkBPOr648CJBdZvV9jkqjVIAIFzzvH/EFdaSeaCERMz
j6oqUwCT8Gd5BiT5kQyWaTbcs33+wXNzFzapUE6Yrz2mxEUV4MMCIopAwwis4BSl
yGB+wHT4iQkfucgwT98=
-----END CERTIFICATE-----`;

const passKey = `-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQI+g143lVPS8gCAggA
MBQGCCqGSIb3DQMHBAiGX4T5muTvKwSCBMh/QOvjtG3Nx3PMuLb+neLrRgDBfsLN
KrMp55GgUzrZ0HfALtVUzX7wP2HskUg+/qIcAT43JZco9wuruYQyHzf+QdqsPQeV
ksrE2hAac19ih4ubBlZCf2CtnRU+l8PGaLuONQOrfyiDipqF1xgD19pMVaCz0FEH
MoWeUMLX3Ea+SLegwjiFGGl7ZpxPsMzggJwqAiwb0QJ7dqhORxsbAmfErk373S6f
LQqyCHqO8xeM1WW1KAZaIoA5O3dzmzlThPLABZH6kYy/M6wNNd4MOUYMdcCPmAj/
6dmUyCzQULjyGLlbnChL25NWljypDVD/eSqJr60mcVlwZjIoJtZLu+NVzaOYZRQX
K5FT1qzvuZg5BbDVE6TSh9dQXr5jCHbF2LIR+kp6kAjV89jVkp4Dr3PRg8Uzs4ye
/NzUD/btvzG8XLvtho1LwXfDlNGoczcFg1p0Vco4t6FVFLnE7EHPK4pvUOAiQn/n
VsHXfC1FCbxB/JVkdlEyg1+GeJHPRporvxc14KSS1kzYmCQInCIDFzDU47hrruxc
oelXnMrMoYxfx6rorZHUlkuYB935EMpRdQL/GJ25p5gunMNn3ch3CdGZ1OtXVxCp
RSRKhxIFdT6rzwNf5OJBbBgZTsjol6bouP8vfZM+QL4riXrP6p9qMUhFHRFuSVpk
M/8oq3zVHINPNy4L1lqWwNhqzPa4s9lZ/Se5a5wO3OwB+kAvaILy/3pX/eznoyl1
VFXEEM5BbW0KZhMKvik32NQ5y1bQkCPUlULe5t3Ff0H1CwJiA0WOp5n1P8r/cEWE
UMLQxI3pUigqD8MVqc3UtANVRi6mlLepVMyUyhu20tKLtLuWrvPzgRoo0tTCvNBP
1EeOgZbBT8Yux96aVxETCIel7plWvrViJshhqL/lEkJBulo80VHCHTRXKNbmI+cz
TgjiNAISuIjCS7R6tvFrGWtFzCMPSRxDWqPb2KxBe90G52rvQhdsM4ybnEguZ+EF
LtGaD8EecN0rG66Wzgvr2pworTcrJxTqoanW+I5am8T7ZFDil7rKee7Jl9HIiJRV
5M+HbQGT3jtfk43G0pI6xsRWQYGjKvneiea3pDEK8bPrY+k/FBdC4+NllSU5J5lA
4bUNtseN/Vpyaj/oKWq+tklIQ4wpNo1UB3jxyFqtw136iU/2gBJRFYO1EQPBai69
psexlf3K0gtOXAWfhZB/IYYenC2K225hUmOGxfhRzjO9UqsYu24NTF1zuu6fSoR/
XBPAqeQgTdGG0T5pYa/zkiSFTIDkOEnIqJ9mtmBjQeOt8K4rnRJfcxIKyPvT4I41
Q11x5zsGBI6pKrZC2j/6vZjMM3Mnv49XMQ5Tb0/8k9PFZ1TE6FX2VOs9Czq7ScGl
eh5Khps0AKFMO5j1juXUr82LxlVCb8Knb/8xdjt8hISAbYDvAnHiBYL+GRpsZBRE
va56aJHV2Vx0yBgd4+3L6VCNCoGVee5XSHqtvI8An4duZSMHzaxjL7r4YjNXfV+t
FJWVtqJ0EScsda3rPAPfdqKzUEOzVOgpGoI4yHQY9JMwpV/btWLRbBGTrfT3vA2I
dUxP8HG7y26YLI7/YNkIrFYLntnle/wSYOlGJQ84LaCdrTaYkYNX3WeRmtOwZeGM
9JE=
-----END ENCRYPTED PRIVATE KEY-----`;

const passKeyPw = process.env.PRIVATE_KEY_PW;

const getPass = () => {
    return new Promise((resolve, reject) => {
        try {
            Template.load(
                __dirname + "/Event.pass",
                ""
            ).then((template) => {
                template.setCertificate(passCert);
                template.setPrivateKey(passKey, passKeyPw);
                template.passTypeIdentifier = "pass.com.dereks.angels.gate";
                template.teamIdentifier = "MXL";
                const pass = template.createPass({
                    serialNumber: "123456",
                    description: "20% off"
                });
        
                pass.asBuffer().then((buffer) => {
                    resolve(buffer);
                }).catch((err) => {
                    reject(err);
                });
                
            }).catch((err) => {
                reject(err);
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports.getPass = getPass;