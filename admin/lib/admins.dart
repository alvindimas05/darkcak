import 'dart:convert';
import 'dart:ffi';
import 'dart:io';

import 'package:admin/config.dart';
import 'package:flutter/material.dart';
import 'package:functional_widget_annotation/functional_widget_annotation.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Admins extends StatelessWidget {
  const Admins({super.key});

  @widget
  Widget listBtn(String title) => Container(
      width: double.infinity,
      decoration: const BoxDecoration(
          border: Border(bottom: BorderSide(color: Colors.black))),
      child: Padding(
          padding: const EdgeInsets.all(10),
          child: Row(children: [
            Expanded(
                flex: 7,
                child: Text(title,
                    style: const TextStyle(
                        fontSize: 18, fontWeight: FontWeight.w500))),
            TextButton(
                style: ButtonStyle(backgroundColor:
                    MaterialStateProperty.resolveWith((states) {
                  if (states.contains(MaterialState.pressed)) {
                    return const Color.fromARGB(255, 172, 48, 39);
                  }
                  return Colors.red;
                })),
                onPressed: () {},
                child: const Text(
                  "Delete",
                  style: TextStyle(color: Colors.white, fontSize: 15),
                ))
          ])));

  @widget
  Widget input(String placeholder, TextEditingController controller,
          {submit = false, onPressed}) =>
      TextField(
        onSubmitted: submit ? onPressed : (value) {},
        controller: controller,
        enableSuggestions: false,
        autocorrect: false,
        decoration: InputDecoration(
            hintText: placeholder,
            border: const UnderlineInputBorder(
                borderSide: BorderSide(color: Colors.black)),
            contentPadding:
                const EdgeInsets.symmetric(vertical: 5, horizontal: 10)),
      );

  @override
  Widget build(BuildContext context) {
    final username = TextEditingController(),
        password = TextEditingController();

    Future<void> submit(e) async {
      if (username.text.isNotEmpty && password.text.isNotEmpty) {
        var prefs = await SharedPreferences.getInstance(),
            admin_id = prefs.getString("admin_id"),
            res = await http.post(Uri.http(api_url, "/api/admin/admin/add"),
                body: {
                  "username": username.text,
                  "password": password.text,
                  "admin_id": admin_id
                });
        dynamic body = jsonDecode(res.body);
        if (body["status"]) {
          Navigator.of(context).pushAndRemoveUntil(
              MaterialPageRoute(builder: (context) => this), (route) => false);
        } else {
          alert(context, body["msg"]);
        }
      }
    }

    final Future<dynamic> _result = Future<dynamic>(() async {
      var prefs = await SharedPreferences.getInstance(),
          res = await http.post(Uri.http(api_url, "/api/admin/admin"),
              body: {"admin_id": prefs.getString("admin_id")});

      return jsonDecode(res.body);
    });

    return Scaffold(
        appBar: AppBar(title: const Text("Admins")),
        body: FutureBuilder<dynamic>(
            future: _result,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                List<Widget> arr = [
                  input("Username", username),
                  input("Password", password, submit: true, onPressed: submit)
                ];

                for (var dat in snapshot.data["data"]) {
                  arr.add(listBtn(dat["username"]));
                }

                return Column(children: arr);
              } else if (snapshot.hasError) {
                return Text("Error : ${snapshot.error}");
              }

              return const Text("Loading...");
            }));
  }
}
