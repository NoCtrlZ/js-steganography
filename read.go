package main

import (
	"bytes"
	"fmt"
	"io"
	"os"
)

func parse(r io.Reader) error {
	buffer := new(bytes.Buffer)
	_, err := buffer.ReadFrom(r)
	if err != nil {
		return err
	}
	if string(buffer.Next(8)) != "\x89PNG\r\n\x1a\n" {
		return fmt.Errorf("not a PNG")
	}

	return nil
}

func main() {
	imageFile := "sample.png"
	file, err := os.Open(imageFile)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()

	err = parse(file)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("Complete")
}
