package com.example.jaWeb;
// Java 客户端代码

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.SQLOutput;
import java.util.Scanner;

public class aHttp {

    public static void main(String[] args) throws IOException {
        // Python 服务的 URL
        String pythonUrl = "http://localhost:5000/execute_verification";

        // 从用户输入获取参数
//        Scanner scanner = new Scanner(System.in);
//        System.out.println("Enter param1:");
//        String param1 = scanner.nextLine();
//        System.out.println("Enter param2:");
//        String param2 = scanner.nextLine();
        String param1 = "D:/study/code/face/test_faces";
        String param2 = "D:/study/code/face/face";

//        String param1 = "12";
//        String param2 = "56";

        // 创建 URL 对象
        URL url = new URL(pythonUrl);

        // 打开连接
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        // 设置请求方法为 POST
        connection.setRequestMethod("POST");

        // 启用输入和输出流
        connection.setDoOutput(true);

        // 发送参数

        try (DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream())) {
            outputStream.writeBytes("param1=" + param1 + "&param2=" + param2);
        }

        // 获取响应
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
            StringBuilder response = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                response.append(line);
            }

            System.out.println("Result from Python: " + response.toString());
            System.out.println(response.toString());
        } finally {
            // 断开连接
            connection.disconnect();
        }
    }
}
