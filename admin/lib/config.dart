import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

const String api_url = "ancritbat.my.id";
void alert(context, msg) => showDialog(
    context: context,
    builder: (context) => AlertDialog(
          title: const Text("Darkcak Admin"),
          content: Text(msg),
          actions: [
            TextButton(
                onPressed: () => Navigator.of(context).pop(),
                child: const Text("OK"))
          ],
        ));
