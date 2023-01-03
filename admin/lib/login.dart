import "dart:convert";
import "package:flutter/material.dart";
import "package:functional_widget_annotation/functional_widget_annotation.dart";
import "package:http/http.dart" as http;

import "config.dart";

class Login extends StatelessWidget {
  const Login({super.key});

  @widget
  Widget input(String placeholder, TextEditingController controller,
          {password = false}) =>
      Padding(
        padding: const EdgeInsets.only(left: 50, right: 50, top: 10),
        child: TextField(
          controller: controller,
          obscureText: password,
          enableSuggestions: false,
          autocorrect: false,
          decoration: InputDecoration(
              hintText: placeholder,
              border: const OutlineInputBorder(),
              contentPadding:
                  const EdgeInsets.symmetric(vertical: 5, horizontal: 10)),
        ),
      );

  @override
  Widget build(BuildContext context) {
    final username = TextEditingController(),
        password = TextEditingController();
    bool login = false;
    String msg = "Aseli";

    Future<void> log_in() async {
      if (!login) {
        login = true;
        var body = {"username": username.text, "password": password.text},
            res = await http.post(Uri.http(api_url, "/api/admin/admin/login"),
                body: body),
            obj = jsonDecode(res.body);
        if (!obj["status"]) login = false;
      }
    }

    return MaterialApp(
      title: "Login",
      theme: ThemeData.dark(),
      home: Scaffold(
          appBar: AppBar(title: const Text("Login")),
          body: Stack(children: [
            Center(
                child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Text(
                  "Login Lorem Ipsum",
                  style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
                ),
                input("Username", username),
                input("Password", password, password: true),
                TextButton(
                  style: ButtonStyle(backgroundColor:
                      MaterialStateProperty.resolveWith((states) {
                    if (states.contains(MaterialState.pressed)) {
                      return Colors.white60;
                    }
                    return Colors.white;
                  })),
                  onPressed: log_in,
                  child: const Text(
                    "Login",
                    style: TextStyle(color: Colors.black, fontSize: 18),
                  ),
                )
              ],
            ))
          ])),
    );
  }
}
