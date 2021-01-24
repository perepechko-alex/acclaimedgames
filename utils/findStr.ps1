$strName=$args[0]
Get-ChildItem -Recurse | Select-String $strName -CaseSensitive -List | Select Path