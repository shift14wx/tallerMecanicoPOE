package com.mecanica.org.web.rest;

import com.mecanica.org.domain.Marca;
import com.mecanica.org.repository.MarcaRepository;
import com.mecanica.org.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mecanica.org.domain.Marca}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MarcaResource {

    private final Logger log = LoggerFactory.getLogger(MarcaResource.class);

    private static final String ENTITY_NAME = "marca";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MarcaRepository marcaRepository;

    public MarcaResource(MarcaRepository marcaRepository) {
        this.marcaRepository = marcaRepository;
    }

    /**
     * {@code POST  /marcas} : Create a new marca.
     *
     * @param marca the marca to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new marca, or with status {@code 400 (Bad Request)} if the marca has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/marcas")
    public ResponseEntity<Marca> createMarca(@RequestBody Marca marca) throws URISyntaxException {
        log.debug("REST request to save Marca : {}", marca);
        if (marca.getId() != null) {
            throw new BadRequestAlertException("A new marca cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Marca result = marcaRepository.save(marca);
        return ResponseEntity.created(new URI("/api/marcas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /marcas} : Updates an existing marca.
     *
     * @param marca the marca to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated marca,
     * or with status {@code 400 (Bad Request)} if the marca is not valid,
     * or with status {@code 500 (Internal Server Error)} if the marca couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/marcas")
    public ResponseEntity<Marca> updateMarca(@RequestBody Marca marca) throws URISyntaxException {
        log.debug("REST request to update Marca : {}", marca);
        if (marca.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Marca result = marcaRepository.save(marca);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, marca.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /marcas} : get all the marcas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of marcas in body.
     */
    @GetMapping("/marcas")
    public List<Marca> getAllMarcas() {
        log.debug("REST request to get all Marcas");
        return marcaRepository.findAll();
    }

    /**
     * {@code GET  /marcas/:id} : get the "id" marca.
     *
     * @param id the id of the marca to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the marca, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/marcas/{id}")
    public ResponseEntity<Marca> getMarca(@PathVariable Long id) {
        log.debug("REST request to get Marca : {}", id);
        Optional<Marca> marca = marcaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(marca);
    }

    /**
     * {@code DELETE  /marcas/:id} : delete the "id" marca.
     *
     * @param id the id of the marca to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/marcas/{id}")
    public ResponseEntity<Void> deleteMarca(@PathVariable Long id) {
        log.debug("REST request to delete Marca : {}", id);
        marcaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
