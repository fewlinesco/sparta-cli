# Sparta CLI

# Installation

```
$ asdf install
$ yarn install
```

# Usage

<!-- usage -->

```sh-session
$ npm install -g sparta
$ sparta COMMAND
running command...
$ sparta (-v|--version|version)
sparta/1.0.0 darwin-x64 node-v14.6.0
$ sparta --help [COMMAND]
USAGE
  $ sparta COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`sparta help [COMMAND]`](#sparta-help-command)
- [`sparta init`](#sparta-init)
- [`sparta sync`](#sparta-sync)
- [`sparta today`](#sparta-today)
- [`sparta test`](#sparta-test)

## `sparta help [COMMAND]`

display help for sparta

```
USAGE
  $ sparta help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `sparta init`

Initializes the Sparta workspace.

```
USAGE
  $ sparta init

OPTIONS
  -b, --batchID=batchID
  -u, --userID=userID

EXAMPLE
  $ sparta init
```

There are two flags that are hidden from the help (because we don't want students to use them):

- `--spartaURL="<url>"` will update the URL that will be called when talking to Sparta API.
- `--force` or `-f` will recreate the exercises repository (deleting the previous folder, beware).

## `sparta sync`

Updates all the courses for the past days.

```
USAGE
  $ sparta sync
```

## `sparta today`

Downloads the exercises for the current day.

```
USAGE
  $ sparta today
```

## `sparta test`

Replace `yarn jest` and send the results to Sparta.
Arguments are sent as-id to `jest`.

```
USAGE
  $ sparta test [--runInBand] [test-file]
```

<!-- commandsstop -->
