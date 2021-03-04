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
sparta/1.1.0 darwin-x64 node-v14.6.0
$ sparta --help [COMMAND]
USAGE
  $ sparta COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`sparta help [COMMAND]`](#sparta-help-command)
* [`sparta init`](#sparta-init)
* [`sparta sync`](#sparta-sync)
* [`sparta test`](#sparta-test)
* [`sparta today`](#sparta-today)

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

Initializes the Sparta workspace

```
USAGE
  $ sparta init

OPTIONS
  -b, --batchID=batchID
  -u, --userID=userID

EXAMPLE
  $ sparta init
```

_See code: [src/commands/init.ts](https://github.com/fewlinesco/sparta-cli/blob/v1.1.0/src/commands/init.ts)_

## `sparta sync`

Updates all the exercises for the past days

```
USAGE
  $ sparta sync
```

_See code: [src/commands/sync.ts](https://github.com/fewlinesco/sparta-cli/blob/v1.1.0/src/commands/sync.ts)_

## `sparta test`

Launch the tests for an exercise

```
USAGE
  $ sparta test
```

_See code: [src/commands/test.ts](https://github.com/fewlinesco/sparta-cli/blob/v1.1.0/src/commands/test.ts)_

## `sparta today`

Downloads the exercises for the current day

```
USAGE
  $ sparta today
```

_See code: [src/commands/today.ts](https://github.com/fewlinesco/sparta-cli/blob/v1.1.0/src/commands/today.ts)_
<!-- commandsstop -->
