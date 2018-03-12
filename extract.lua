#!/usr/bin/env lua
package.path = package.path .. ";./lib/?.lua"
local utils = require "pl.utils"
local JSON = assert(loadfile "./lib/JSON.lua")() -- one-time load of the routines

function JSON:unsupportedTypeEncoder(value)
    if type(value) == "function" then
        return '"[[ Function ]]"'
    end
    return nil
end

-- process command line args
FACTORIO_PATH = arg[1]
FACTORIO_MOD_PATH = arg[2]

-- helper functions and such
-- logs a statement
function log(msg)
    print(msg)
end

-- joins a list of paths using the correct path separator
function path_join(...)
    local args = {...}
    local p = args[1]
    local path_sep = '/'
    if utils.is_windows then
        path_sep = '\\'
    end
    for i = 2,#args do
        p = p .. path_sep .. args[i]
    end
    return p
end

--- Function equivalent to dirname in POSIX systems
--@param str the path string
function dirname(str)
	if str:match(".-/.-") then
		local name = string.gsub(str, "(.*/)(.*)", "%1")
		return name
	else
		return ''
	end
end

--- Determines if the provided filename represents a file on disk
function file_exists(name)
    local f = io.open(name,"r")
    if f ~= nil then
        io.close(f)
    end
    return f ~= nil
end

-- add the core lualib to the package path
package.path = package.path .. ';' .. path_join(FACTORIO_PATH, "data/core/lualib/?.lua")

-- modify package path to ensure Factorio's paths are available
--package.path = package.path .. ';/Users/scottrabin/Library/Application Support/Steam/steamapps/common/Factorio/factorio.app/Contents/data/core/lualib/?.lua'
---package.path = package.path .. ';/Users/scottrabin/Library/Application Support/Steam/steamapps/common/Factorio/factorio.app/Contents/data/base/?.lua'

settings_files = {"settings.lua"}
mod_files = {"data.lua", "data-updates.lua", "data-final-fixes.lua"}

-- this actually needs to be invoked in this context, as do the subsequent mod files,
-- to ensure the correct helper functions are available in the mod data files
dofile(path_join(FACTORIO_PATH, "data/core/lualib/dataloader.lua"))

-- generate the list of mods
-- TODO
mod_list = {
    {
        name = "base",
        path = path_join(FACTORIO_PATH, "data/base")
    }
}

-- redefine module to prevent ???
function module(modname,...)
end

-- util doesn't seem to get imported properly?
require "util"
util = {}
util.table = {}
util.table.deepcopy = table.deepcopy
util.multiplystripes = multiplystripes
util.by_pixel = by_pixel
util.format_number = format_number
util.increment = increment

function log(...)
end

defines = {}
defines.difficulty_settings = {}
defines.difficulty_settings.recipe_difficulty = {}
defines.difficulty_settings.technology_difficulty = {}
defines.difficulty_settings.recipe_difficulty.normal = 1
defines.difficulty_settings.technology_difficulty.normal = 1
defines.direction = {}
defines.direction.north = 1
defines.direction.east = 2
defines.direction.south = 3
defines.direction.west = 4

function load_mod(mod)
    local pre_package = package.path
    package.path = package.path .. ";" .. path_join(mod.path, "?.lua")

    log(mod)
    log(package.path)

    for i, filename in ipairs(settings_files) do
        file = path_join(mod.path, filename)
        log("initializing settings in " .. file)
        dofile_if_exists(file)
    end

    for i, filename in ipairs(mod_files) do
        file = path_join(mod.path, filename)
        log("loading file " .. file)
        dofile_if_exists(file)
    end

    package.path = pre_package
end

function dofile_if_exists(file)
    if file_exists(file) then
        dofile(file)
    else
        log("skipping " .. file)
    end
end

--print(arg)
for _,mod in ipairs(mod_list) do
    load_mod(mod)
end
print(JSON:encode_pretty(data))
