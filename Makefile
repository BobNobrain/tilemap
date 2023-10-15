export PATH := ./node_modules/.bin:$(PATH)

SRCDIR = src
OUTDIR = dist
BUILDDIR = build

.PHONY: all
all: typecheck entries

.PHONY: clean
clean:
	rm -r $(OUTDIR)

#
# checkers
#
.PHONY: lint lint_fix typecheck

lint:
	eslint --ext=.ts $(SRCDIR)
	prettier $(SRCDIR) --check

lint_fix:
	eslint --ext=.ts --fix $(SRCDIR)
	prettier $(SRCDIR) --write

typecheck:
	tsc --noEmit

#
# entries
#
.PHONY: entries map.entry noise.entry single.entry space.entry

entries: $(OUTDIR) map.entry noise.entry single.entry space.entry

$(OUTDIR):
	mkdir $(OUTDIR)

%.entry: $(OUTDIR)/%.html
	esbuild $(SRCDIR)/entries/$*.ts --bundle --outdir=$(OUTDIR)

$(OUTDIR)/%.html: html/index.html
	sed 's/$$SCRIPT/$*.ts/' $< > $@

#
# assets
#
ASSETS_SRCDIR = assets
STATIC_ASSETS_SRCDIR = $(ASSETS_SRCDIR)/static
GENERATED_ASSETS_SRCDIR = $(ASSETS_SRCDIR)/generated
ASSETS_OUTDIR = $(OUTDIR)/assets

STATIC_ASSETS = $(shell find $(STATIC_ASSETS_SRCDIR) -type f)

# generated assets
ASSETGEN = ts-node $(ASSETS_SRCDIR)/generator/main.ts
GENERATED_ASSETS = $(dir $(shell cd $(GENERATED_ASSETS_SRCDIR) && find . -type f -name 'index.ts'))
#  $(realpath $(addprefix $(GENERATED_ASSETS_SRCDIR)/,$(GENERATED_ASSETS_RELATIVE_DIRS)))

define GENERATED_ASSET_RULE_TEMPLATE =
$(ASSETS_OUTDIR)/$(1): $(shell find $(realpath $(GENERATED_ASSETS_SRCDIR)/$(1)) -type f)
	SRCDIR=$(GENERATED_ASSETS_SRCDIR) OUTDIR=$(ASSETS_OUTDIR) $(ASSETGEN) $(1)
endef

$(foreach asset,$(GENERATED_ASSETS),$(eval $(call GENERATED_ASSET_RULE_TEMPLATE,$(asset))))

.PHONY: generated-assets test
generated-assets: $(addprefix $(ASSETS_OUTDIR)/,$(GENERATED_ASSETS))

test:
	@echo $(addprefix $(ASSETS_OUTDIR)/,$(GENERATED_ASSETS))
