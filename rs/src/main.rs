use termion::event::Key;
use termion::input::TermRead;
use termion::raw::IntoRawMode;

use colored::*;

use std::io::{stdin, stdout, Write};
use std::usize;

struct Minesweeper {
    board: [u8; 81],
    cursor: usize,
    width: usize,
    height: usize,
    pause: bool,
}

impl Minesweeper {
    fn new() -> Minesweeper {
        Minesweeper {
            board: [0; 81],
            cursor: 0,
            width: 9,
            height: 9,
            pause: false,
        }
    }

    fn control(&mut self) {
        let cursor = self.cursor;
        loop {
            match stdin().keys().next().unwrap().unwrap() {
                Key::Esc => {
                    // TODO menu
                    self.pause = true;
                    break;
                }
                Key::Char('a') => {
                    if cursor % self.width == 0 {
                        self.cursor += self.width - 1
                    } else {
                        self.cursor -= 1
                    }
                    break;
                }
                Key::Char('d') => {
                    if (cursor + 1) % self.width == 0 {
                        self.cursor -= self.width - 1
                    } else {
                        self.cursor += 1
                    }
                    break;
                }
                Key::Char('w') => {
                    if cursor < self.width {
                        self.cursor += self.width * (self.height - 1)
                    } else {
                        self.cursor -= self.width
                    }
                    break;
                }
                Key::Char('s') => {
                    if cursor >= self.width * (self.height - 1) {
                        self.cursor -= self.width * (self.height - 1)
                    } else {
                        self.cursor += self.width
                    }
                    break;
                }
                Key::Char('j') => {
                    // TODO interact
                    break;
                }
                Key::Char('k') => {
                    // TODO interact
                    break;
                }
                _ => (),
            }
        }
    }

    fn draw(&self) {
        print!("{}{}", termion::clear::All, termion::cursor::Goto(1, 1));
        print!("<Minesweeper>\r\n");
        for i in 0..self.board.len() {
            let mut left = " ";
            let mut right = " ";
            let mut mid = format!("{}", self.board[i]);
            if i % self.width == 0 {
                print!("\r\n");
            }
            if i == self.cursor {
                left = "<";
                right = ">";
            }
            let cell = format!("{}{}{}", left, mid, right);
            print!("{}", cell.on_truecolor(128, 128, 128));
        }
        print!("\r\n");
    }
}

fn main() {
    let mut stdout = stdout().into_raw_mode().unwrap();
    write!(stdout, "{}", termion::cursor::Hide).unwrap();
    let mut game = Minesweeper::new();
    loop {
        game.draw();
        game.control();
        if game.pause {
            break;
        }
    }
    write!(stdout, "{}", termion::cursor::Show).unwrap();
}
