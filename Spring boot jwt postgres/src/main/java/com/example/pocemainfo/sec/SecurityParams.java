package com.example.pocemainfo.sec;

public interface SecurityParams {
    public static final String HEADER_NAME="Authorization";
    public static final String JWT_SECRET="firstappspring782jwt";
    public static final long EXPIRATION=10*24*3600;
    public static final String HEADER_PREFIX="Bearer ";
}
