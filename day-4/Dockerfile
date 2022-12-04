# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine as builder
WORKDIR /App

COPY . ./

RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/runtime:6.0-alpine
WORKDIR /App

COPY --from=builder /App/out .
ENTRYPOINT ["dotnet", "day-4.dll"]
