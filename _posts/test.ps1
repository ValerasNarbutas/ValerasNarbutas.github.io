m365 login --authType deviceCode

# Get all users and their properties, add properties as needed with --properties and separate with comma
m365 aad user list --properties "displayName,mail"

# Get all users and their properties and export to csv
m365 aad user list --output csv --properties "displayName,mail,givenName,jobTitle,mail,mobilePhone,officeLocation,preferredLanguage,surname,userPrincipalName,id" > users.csv
