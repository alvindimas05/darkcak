import "dart:convert";
import 'dart:developer';
import "package:flutter/material.dart";
import "package:functional_widget_annotation/functional_widget_annotation.dart";
import "package:http/http.dart" as http;
import 'package:shared_preferences/shared_preferences.dart';

import "config.dart";
import "home.dart";

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

    void move() {
      Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => const Home()),
          (Route<dynamic> route) => false);
    }

    Future<void> log_in() async {
      if (!login) {
        login = true;
        var res = await http.post(Uri.http(api_url, "/api/admin/admin/login"),
            body: {"username": username.text, "password": password.text});

        dynamic body = jsonDecode(res.body);
        if (body["status"] == true) {
          var prefs = await SharedPreferences.getInstance();
          prefs.setString("admin_id", body["admin_id"]);
          prefs.setInt("role_id", body["role_id"]);

          move();
        } else {
          alert(context, "Login gagal!");
          login = false;
        }
      }
    }

    Future<void> check() async {
      var prefs = await SharedPreferences.getInstance();

      if (prefs.getString("admin_id") != null &&
          prefs.getInt("role_id") != null) {
        move();
      }
    }

    check();
    return Scaffold(
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
              style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.resolveWith((states) {
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
      ]),
    );
  }
}
